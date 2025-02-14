import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

userID = st.session_state['id']

st.write("# Edit a Question")

question_id = st.text_input("Enter the Question ID you want to edit:")

if question_id:
    # Optional: fetch the existing details for display
    get_url = f"http://api:4000/q/questions/{question_id}"
    response = requests.get(get_url)

    if response.status_code == 200:
        question_data = response.json()
        existing_companyID = question_data.get('companyID', '')
        existing_questionType = question_data.get('questionType', '')

        with st.form("edit_question_form"):
            updated_companyID = st.text_input("Company ID", value=str(existing_companyID))
            updated_questionType = st.text_area("Question Type", value=existing_questionType)

            submitted = st.form_submit_button("Update Question")
            if submitted:
                update_data = {
                    "companyID": updated_companyID,
                    "questionType": updated_questionType,
                    "userID": userID  # Ensure this is available in session_state
                }

                put_url = f"http://api:4000/q/questions/{question_id}"
                put_response = requests.put(put_url, json=update_data)

                if put_response.status_code == 200:
                    st.success("Question updated successfully!")
                else:
                    st.error(f"Failed to update question: {put_response.text}")

    else:
        st.error("Question not found or cannot be retrieved.")
