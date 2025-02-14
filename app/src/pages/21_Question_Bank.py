import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.title("Question Bank")
st.write('')
st.write('')
st.write('### How can I assist you with the Question Bank?')

# Can reuse this
if st.button('View Question Bank',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/01.1_View_All_Questions.py')

# Can reuse this
if st.button('Find Specific Question',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/01.2_View_Specific_Question.py')

# Can reuse this
if st.button ('Add New Question',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/11.1_Add_A_Question.py')

if st.button ('Edit Question',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/41.2_Edit_Question.py')
