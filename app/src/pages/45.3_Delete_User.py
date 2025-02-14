import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Delete User")
st.write ("")
st.write("Type in the User ID to delete that company")\

with st.form("UserID"):
  user_id = st.text_input("User ID")
  submitted = st.form_submit_button("Delete This User")
  if submitted:
    url = f'http://api:4000/co/companies/{user_id}'
    
    try:
      response = requests.delete(url)
      response.raise_for_status()
      st.write("User deleted successfully")
    except:
      st.write("Could not connect connect to api.")

# TODO: Erroring because of ON DELETE relationships needs to be fixed in db