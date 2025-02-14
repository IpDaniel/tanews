import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.write("# Tell A Story")

st.write("## Tell a story of your own job search experience")

userID = st.session_state['id']

with st.form("Tell my story"):
  review = st.text_area("Tell your story here")
  companyID = st.text_input("Company ID")

  submitted = st.form_submit_button("Submit")

  if submitted:

    data = {}
    data['review'] = review
    data['userID'] = userID
    data['companyID'] = companyID
    st.write(data)

    requests.post('http://api:4000/p/peerstories', json=data)


# Please keep company ID in the range 1-40 as that are as many companies as we have rn