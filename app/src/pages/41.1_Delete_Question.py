import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Delete Question")
st.write ("")
st.write("Type in the question ID to delete")

with st.form("QuestionID"):
  question_id = st.text_input("Question ID")
  submitted = st.form_submit_button("Delete This Question Prep")
  if submitted:
    url = f'http://api:4000/q/questions/{question_id}'
    
    try:
      response = requests.delete(url)
      response.raise_for_status()
      st.write("Question deleted successfully")
    except:
      st.write("Could not connect connect to api.")

# TODO: Erroring because of ON DELETE relationships needs to be fixed in db