import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Add an Interview Prep")

st.write("## Schedule an interview preparation session")

userID = st.session_state['id']

with st.form("Schedule Interview Prep"):
    studentID = st.text_input("Student ID")
    taID = st.text_input("TA ID")
    questionID = st.text_input("Question ID")
    meetingDate = st.date_input("Meeting Date")

    submitted = st.form_submit_button("Submit")

    if submitted:
        try:
            data = {
                "studentID": int(studentID),
                "taID": int(taID),
                "questionID": int(questionID),
                "meetingDate": meetingDate.strftime("%Y-%m-%d")
            }
            st.write("Interview Prep submitted successfully")

            response = requests.post('http://api:4000/i/interviewprep', json=data)
            
            if response.status_code in [200, 201]:
                st.success("Interview Prep added successfully!")
            else:
                st.error(f"Failed to add Interview Prep: {response.text}")
        except ValueError:
            st.error("Please enter valid numeric IDs.")
        except Exception as e:
            st.error(f"An error occurred: {e}")

