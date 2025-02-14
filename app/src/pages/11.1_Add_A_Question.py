import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Add A Question")

st.write("## Add an interview question you have experienced")

userID = st.session_state['id']

with st.form("Tell my story"):
  questionType = st.text_area("What type of question is it?")
  companyID = st.text_input("Company ID")

  submitted = st.form_submit_button("Submit")

  if submitted:

    data = {}
    data['companyID'] = companyID
    data['questionType'] = questionType
    data['userID'] = userID
    st.write("Question submitted successfully")

    requests.post('http://api:4000/q/questions', json=data)


# Please keep company ID in the range 1-40