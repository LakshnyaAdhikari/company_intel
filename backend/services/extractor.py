# extract html text using beautiful soup + playwright fallback

import requests
from bs4 import BeautifulSoup
from playwright.sync_api import sync_playwright


def extract_with_playwright(url):
    try:
        print(f"[Playwright] Opening {url}")

        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()

            page.goto(url, timeout=30000)
            page.wait_for_load_state("domcontentloaded")

            html = page.content()
            browser.close()

            print(f"[Playwright] HTML length: {len(html)}")

            soup = BeautifulSoup(html, "lxml")

            for tag in soup(["script", "style", "nav", "footer"]):
                tag.decompose()

            text = soup.get_text(separator=" ", strip=True)

            print(f"[Playwright] Extracted length: {len(text)}")

            return text

    except Exception as e:
        print(f"Playwright extraction failed for {url}: {e}")
        return ""


def extract_page_text(url):
    try:
        headers = {
            "User-Agent": "Mozilla/5.0"
        }

        response = requests.get(url, headers=headers, timeout=5)

        print(f"[Requests] Status for {url}: {response.status_code}")

        # If blocked or failed → fallback to Playwright
        if response.status_code != 200:
            print(
                f"[Fallback Triggered] Request blocked for {url}, switching to Playwright..."
            )
            return extract_with_playwright(url)

        print(f"[Requests] Raw HTML length: {len(response.text)}")

        soup = BeautifulSoup(response.text, "lxml")

        for tag in soup(["script", "style", "nav", "footer"]):
            tag.decompose()

        text = soup.get_text(separator=" ", strip=True)

        print(f"[Requests] Extracted length: {len(text)}")

        # If weak static content → fallback to Playwright
        if len(text.strip()) < 300:
            print(
                f"[Fallback Triggered] Weak content detected for {url}, switching to Playwright..."
            )
            return extract_with_playwright(url)

        return text

    except Exception as e:
        print(f"Error extracting {url}: {e}")
        return ""