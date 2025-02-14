import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

st.title("Companies")
st.write('')
st.write('')
st.write('### What would you like to do, Administrator')

if st.button('View All Companies',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44.1_View_All_Companies.py')

if st.button('Edit Company Details',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44.2_Edit_Company.py') #TODO: Implement this page

if st.button('Delete Company',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44.3_Delete_Company.py')