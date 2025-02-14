import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Finding A User")
st.write ("")
st.write("Enter the User ID to view the question details")\

with st.form("UserID"):
  user_id = st.text_input("User ID")
  submitted = st.form_submit_button("Submit")
  if submitted:
    url = f'http://api:4000/u/users/{user_id}'
    question = requests.get(url).json()
    try:
      st.write(question)
    except:
      st.write("Could not connect connect to api.")
