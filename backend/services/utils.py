#for agents to see all contents at one place


from backend.services.extractor import extract_page_text


def aggregate_company_content(links):
    all_content = ""

    for link in links:
        print(f"Extracting: {link}")

        page_text = extract_page_text(link)

        print(f"Extracted chars from {link}: {len(page_text)}")

        if page_text:
            all_content += f"\n\n--- PAGE: {link} ---\n"
            all_content += page_text

    return all_content
