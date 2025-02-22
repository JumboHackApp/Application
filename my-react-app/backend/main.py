from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy
import requests
from bs4 import BeautifulSoup

app = FastAPI()

# Enable CORS (Allow frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to your frontend domain in production
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

class ResumeInput(BaseModel):
    resume_text: str
    location: str = "Remote"

def extract_skills_experience(resume_text):
    """Extracts skills from the resume using NLP"""
    doc = nlp(resume_text)
    skills = set(token.text.lower() for token in doc if token.pos_ in ["NOUN", "PROPN"] and token.is_alpha)
    print(skills)
    return list(skills)


import traceback
import time

import traceback
import time

def search_jobs(skills, location="Remote", num_results=5):
    """Searches job listings based on extracted skills"""
    query = "+".join(skills[:5])
    job_search_url = f"https://www.indeed.com/jobs?q={query}&l={location}"

    HEADERS = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36"
    }

    print(f"🔍 Fetching jobs from: {job_search_url}")

    for attempt in range(3):  # Retry up to 3 times
        try:
            response = requests.get(job_search_url, headers=HEADERS, timeout=10)
            response.raise_for_status()  # Raise error for non-200 status codes

            print(f"✅ Response status: {response.status_code}")
            print(f"🔍 Response content: {response.text[:500]}")  # Print first 500 characters

            soup = BeautifulSoup(response.text, "html.parser")
            jobs = []

            for job_card in soup.find_all("div", class_="job_seen_beacon")[:num_results]:
                title_elem = job_card.find("h2")
                company_elem = job_card.find("span", class_="companyName")
                link_elem = job_card.find("a")

                if title_elem and company_elem and link_elem:
                    jobs.append({
                        "title": title_elem.text.strip(),
                        "company": company_elem.text.strip(),
                        "link": "https://www.indeed.com" + link_elem["href"]
                    })

            if jobs:
                return jobs
            else:
                print("⚠️ No jobs found, retrying...")
                time.sleep(2)  # Wait before retrying

        except requests.RequestException as e:
            print(f"⚠️ Attempt {attempt + 1}: Request failed - {e}")
            traceback.print_exc()  # Print full error
            time.sleep(2)  # Wait before retrying

    raise HTTPException(status_code=500, detail="Failed to fetch job listings")





import traceback

@app.post("/match-jobs/")
async def match_jobs(resume: ResumeInput):
    try:
        skills = extract_skills_experience(resume.resume_text)
        jobs = search_jobs(skills, resume.location)
        return {"skills": skills, "jobs": jobs}
    except Exception as e:
        print("🔥 ERROR:", str(e))
        traceback.print_exc()  # Prints full error traceback
        raise HTTPException(status_code=500, detail=str(e))

