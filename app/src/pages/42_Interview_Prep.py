import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.title("Interview Preps Bank")
st.write('')
st.write('')
st.write('### What would you like to do, Administrator')

if st.button('View All Interview Prep',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/02.1_View_All_Interview_Prep.py')

if st.button('View Interview Prep by ID',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/02.3_View_Specific_Interview_Prep.py')

