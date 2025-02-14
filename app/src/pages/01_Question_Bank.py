import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.title(f"How would you like to access the Question Bank, {st.session_state['first_name']}?")
st.write('')
st.write('')
st.write('### How can we help you today?')

if st.button('View Question Bank',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/01.1_View_All_Questions.py')

if st.button('Find Specific Question',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/01.2_View_Specific_Question.py')