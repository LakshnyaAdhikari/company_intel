# given a company, this page will collect URLs

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse


def get_internal_links(base_url, max_pages=15, should_cancel=None):
    visited = set()
    to_visit = [base_url]
    internal_links = []

    domain = urlparse(base_url).netloc

    while to_visit and len(visited) < max_pages:
        if should_cancel and should_cancel():
            break

        current_url = to_visit.pop(0)
        print(f"Visiting: {current_url}")

        if current_url in visited:
            continue

        try:
            response = requests.get(current_url, timeout=5)
            print("status code:", response.status_code)

            if response.status_code != 200:
                continue

            visited.add(current_url)
            internal_links.append(current_url)

            soup = BeautifulSoup(response.text, "lxml")

            for tag in soup.find_all("a", href=True):
                href = tag["href"]

                full_url = urljoin(base_url, href)

                if urlparse(full_url).netloc == domain:
                    if full_url not in visited and full_url not in to_visit:
                        to_visit.append(full_url)

        except Exception as e:
            print(f"Error visiting {current_url}: {e}")

    return internal_links
