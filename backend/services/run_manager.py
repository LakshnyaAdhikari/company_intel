import threading
import uuid
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone

from backend.services.analysis_service import (
    AnalysisCancelled,
    analyze_company,
    get_company_slug,
    get_results_path
)


executor = ThreadPoolExecutor(max_workers=2)
runs = {}
runs_lock = threading.Lock()


def _now():
    return datetime.now(timezone.utc).isoformat()


def start_analysis_run(company_url, max_pages=10, selected_agents=None):
    run_id = str(uuid.uuid4())
    cancel_event = threading.Event()

    run = {
        "run_id": run_id,
        "status": "queued",
        "step": "Queued",
        "company_url": company_url,
        "company": get_company_slug(company_url),
        "max_pages": max_pages,
        "selected_agents": selected_agents,
        "results_path": get_results_path(company_url),
        "error": "",
        "result": None,
        "cancel_requested": False,
        "created_at": _now(),
        "updated_at": _now(),
        "_cancel_event": cancel_event
    }

    with runs_lock:
        runs[run_id] = run

    executor.submit(_run_analysis, run_id)

    return public_run(run)


def _update_run(run_id, **updates):
    with runs_lock:
        run = runs[run_id]
        run.update(updates)
        run["updated_at"] = _now()


def _run_analysis(run_id):
    with runs_lock:
        run = runs[run_id]
        cancel_event = run["_cancel_event"]
        company_url = run["company_url"]

    def progress(step):
        _update_run(run_id, step=step)

    try:
        _update_run(run_id, status="running", step="Validating URL")
        result = analyze_company(
            company_url,
            max_pages=run["max_pages"],
            selected_agents=run.get("selected_agents"),
            should_cancel=cancel_event.is_set,
            progress_callback=progress
        )
        _update_run(
            run_id,
            status="completed",
            step="Complete",
            result=result
        )
    except (AnalysisCancelled, RuntimeError) as error:
        if cancel_event.is_set():
            _update_run(
                run_id,
                status="cancelled",
                step="Cancelled",
                error=str(error)
            )
        else:
            _update_run(run_id, status="failed", step="Failed", error=str(error))
    except Exception as error:
        _update_run(run_id, status="failed", step="Failed", error=str(error))


def get_analysis_run(run_id):
    with runs_lock:
        run = runs.get(run_id)

    return public_run(run) if run else None


def cancel_analysis_run(run_id):
    with runs_lock:
        run = runs.get(run_id)

        if not run:
            return None

        run["_cancel_event"].set()
        run["cancel_requested"] = True
        run["updated_at"] = _now()

        if run["status"] == "queued":
            run["status"] = "cancelled"
            run["step"] = "Cancelled"

    return public_run(run)


def public_run(run):
    if not run:
        return None

    return {
        key: value
        for key, value in run.items()
        if not key.startswith("_")
    }
