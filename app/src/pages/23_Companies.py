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
st.write('### How can I assist you with the Companies?')

if st.button('View All Companies',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44.1_View_All_Companies.py')

if st.button('Edit Company Details',
              type='primary',
              use_container_width=True):
  st.switch_page('pages/44.2_Edit_Company.py')
