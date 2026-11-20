from dotenv import load_dotenv
import os
from pathlib import Path
from crewai import Agent, Task, Crew, LLM

BACKEND_DIR = Path(__file__).resolve().parents[1]
load_dotenv(BACKEND_DIR / ".env")

llm = LLM(
    model=f"azure/{os.getenv('AZURE_OPENAI_DEPLOYMENT')}",
    api_key=os.getenv("AZURE_OPENAI_API_KEY"),
    base_url=os.getenv("AZURE_OPENAI_ENDPOINT"),
    api_version=os.getenv("AZURE_OPENAI_API_VERSION")
)


def clean_output(output):
    if not output:
        return ""

    return str(output).replace("```json", "").replace("```", "").strip()


def _raise_if_cancelled(should_cancel):
    if should_cancel and should_cancel():
        raise RuntimeError("Analysis was cancelled")


def run_company_analysis(company_content, selected_agents=None, should_cancel=None):

    leadership_agent = Agent(
        llm=llm,
        role="Leadership Analyst",
        goal="Find leadership information from company content",
        backstory=(
            "Expert in identifying founders, CEOs, executives, "
            "and leadership structures."
        ),
        verbose=False
    )

    services_agent = Agent(
        llm=llm,
        role="Services Analyst",
        goal="Find company services and offerings",
        backstory=(
            "Expert in identifying products, services, APIs, and "
            "business offerings."
        ),
        verbose=False
    )

    legal_agent = Agent(
        llm=llm,
        role="Legal Analyst",
        goal="Find legal entity details and company legal structure",
        backstory=(
            "Expert in identifying company legal names, parent "
            "entities, and compliance references."
        ),
        verbose=False
    )

    technology_agent = Agent(
        llm=llm,
        role="Technology Analyst",
        goal=(
            "Identify the technology stack, platforms, tools, and "
            "technical infrastructure used by the company"
        ),
        backstory=(
            "Expert in identifying software stacks, APIs, cloud "
            "platforms, frameworks, and developer ecosystems."
        ),
        verbose=False
    )

    market_agent = Agent(
        llm=llm,
        role="Market Intelligence Analyst",
        goal=(
            "Identify the company’s market positioning, domain, "
            "business model, and target customers"
        ),
        backstory=(
            "Expert in analyzing industries, market categories, "
            "and business strategies."
        ),
        verbose=False
    )

    contact_agent = Agent(
        llm=llm,
        role="Contact and Presence Analyst",
        goal=(
            "Find company locations, offices, contact channels, and "
            "online presence"
        ),
        backstory=(
            "Expert in identifying office locations, emails, "
            "phone numbers, and company presence across platforms."
        ),
        verbose=False
    )

    leadership_task = Task(
        description=(
            f"Analyze the following company content and "
            f"extract leadership information:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "founders": [],
  "ceo": "",
  "executives": [],
  "board_members": [],
  "headquarters": ""
}

Rules:
- Do not add explanations.
- Do not return markdown.
- Do not return extra keys.
- Use null or empty arrays if data is unavailable.
- Prefer explicit founder names if present.
- Do not leave founders empty if founder information is available.
""",
        agent=leadership_agent
    )

    services_task = Task(
        description=(
            f"Analyze the following company content and "
            f"extract services and offerings:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "core_products": [],
  "services": [],
  "apis": [],
  "business_solutions": []
}

Rules:
- Include only direct revenue-generating products/services.
- Exclude CSR, grants, community programs, education support,
  climate relief, and internal initiatives.
- Ignore irrelevant text.
""",
        agent=services_agent
    )

    legal_task = Task(
        description=(
            f"Analyze the following company content and "
            f"extract legal structure information:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "registered_name": "",
  "entity_type": "",
  "parent_company": "",
  "subsidiaries": [],
  "compliance_mentions": []
}

Rules:
- Only extract legal/corporate structure info.
- Do not infer legal entities.
""",
        agent=legal_agent
    )

    technology_task = Task(
        description=(
            f"Analyze the following company content and "
            f"identify technology stack, platforms, tools, and "
            f"infrastructure:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "frameworks": [],
  "cloud_platforms": [],
  "apis": [],
  "integrations": [],
  "developer_tools": []
}

Rules:
- Only include explicitly mentioned technical stack info.
- Do not infer or assume technologies.
- Ignore marketing text.
""",
        agent=technology_agent
    )

    market_task = Task(
        description=(
            f"Analyze the following company content and "
            f"identify market domain, target audience, and business "
            f"model:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "industry": "",
  "target_customers": [],
  "regions": [],
  "business_model": "",
  "competitors": []
}

Rules:
- Only extract market/business positioning.
- Only include competitors if explicitly mentioned.
""",
        agent=market_agent
    )

    contact_task = Task(
        description=(
            f"Analyze the following company content and "
            f"extract company office locations, contact channels, and digital "
            f"presence:\n{company_content}"
        ),
        expected_output="""
Return ONLY valid JSON in this exact schema:

{
  "headquarters": "",
  "office_locations": [],
  "emails": [],
  "phone_numbers": [],
  "social_links": []
}

Rules:
- Only extract contact/presence data.
- Ignore unrelated content.
- Do not duplicate office locations.
""",
        agent=contact_agent
    )

    agent_map = {
        "leadership": leadership_agent,
        "services": services_agent,
        "legal": legal_agent,
        "technology": technology_agent,
        "market": market_agent,
        "contact": contact_agent
    }

    task_map = {
        "leadership": leadership_task,
        "services": services_task,
        "legal": legal_task,
        "technology": technology_task,
        "market": market_task,
        "contact": contact_task
    }

    valid_agent_names = list(agent_map.keys())

    if selected_agents is None:
        selected_agent_names = valid_agent_names
    else:
        if not selected_agents:
            raise ValueError("selected_agents must include at least one agent")

        selected_agent_names = [
            agent_name for agent_name in selected_agents
            if agent_name in agent_map
        ]

    invalid_agent_names = set(selected_agents or []) - set(valid_agent_names)
    if invalid_agent_names:
        raise ValueError(
            f"Invalid selected_agents: {sorted(invalid_agent_names)}. "
            f"Choose from: {valid_agent_names}"
        )

    for agent_name in selected_agent_names:
        _raise_if_cancelled(should_cancel)

        crew = Crew(
            agents=[agent_map[agent_name]],
            tasks=[task_map[agent_name]],
            verbose=True
        )

        crew.kickoff()

    return {
        agent_name: (
            clean_output(task_map[agent_name].output)
            if agent_name in selected_agent_names
            else "{}"
        )
        for agent_name in valid_agent_names
    }
