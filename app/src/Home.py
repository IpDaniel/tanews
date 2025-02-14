##################################################
# This is the main/entry-point file for the 
# sample application for your project
##################################################

# Set up basic logging infrastructure
import logging
logging.basicConfig(format='%(filename)s:%(lineno)s:%(levelname)s -- %(message)s', level=logging.INFO)
logger = logging.getLogger(__name__)

# import the main streamlit library as well
# as SideBarLinks function from src/modules folder
import streamlit as st
from modules.nav import SideBarLinks

# streamlit supports reguarl and wide layout (how the controls
# are organized/displayed on the screen).
st.set_page_config(layout = 'wide')

# If a user is at this page, we assume they are not 
# authenticated.  So we change the 'authenticated' value
# in the streamlit session_state to false. 
st.session_state['authenticated'] = False

# Use the SideBarLinks function from src/modules/nav.py to control
# the links displayed on the left-side panel. 
# IMPORTANT: ensure src/.streamlit/config.toml sets
# showSidebarNavigation = false in the [client] section
SideBarLinks(show_home=True)

# ***************************************************
#    The major content of this page
# ***************************************************

# set the title of the page and provide a simple prompt. 
logger.info("Loading the Home page of the app")
st.title('NUReady')
st.write('\n\n')
st.write('### Welcome to NUReady! As which user would you like to log in?')

# For each of the user personas for which we are implementing
# functionality, we put a button on the screen that the user 
# can click to MIMIC logging in as that mock user. 

if st.button("Act as John Smith, a Northeastern Student", 
            type = 'primary', 
            use_container_width=True):
    # when user clicks the button, they are now considered authenticated
    st.session_state['authenticated'] = True
    # we set the role of the current user
    st.session_state['role'] = 'Student'
    # we add the first name of the user (so it can be displayed on 
    # subsequent pages). 
    st.session_state['first_name'] = 'John'
    # also save the id of the user in the session state 
    st.session_state['id'] = '1'
    # finally, we ask streamlit to switch to another page, in this case, the 
    # landing page for this particular user type
    logger.info("Logging in as Student")
    st.switch_page('pages/00_Student_Home.py')

if st.button('Act as Bob Vu, a Northeastern Alumni', 
            type = 'primary', 
            use_container_width=True):
    st.session_state['authenticated'] = True
    st.session_state['role'] = 'Alumni'
    st.session_state['first_name'] = 'Bob'
    logger.info("Logging in as Alumni")
    st.session_state['id'] = '10'
    st.switch_page('pages/10_Alumni_Home.py')

if st.button('Act as Sarah Mitchell, a Northeastern Career Advisor', 
            type = 'primary', 
            use_container_width=True):
    st.session_state['authenticated'] = True
    st.session_state['role'] = 'Advisor'
    st.session_state['first_name'] = 'Sarah'
    st.session_state['id'] = '5'
    logger.info("Logging in as Advisor")
    st.switch_page('pages/20_Advisor_Home.py')

if st.button('Act as Arhat Shah, a Teaching Assistant', 
            type = 'primary', 
            use_container_width=True):
    st.session_state['authenticated'] = True
    st.session_state['role'] = 'TA'
    st.session_state['first_name'] = 'Arhat'
    st.session_state['id'] = '3'
    st.switch_page('pages/30_Teaching_Assistant_Home.py')

if st.button('Act as System Administrator', 
            type = 'primary', 
            use_container_width=True):
    st.session_state['authenticated'] = True
    st.session_state['role'] = 'administrator'
    st.session_state['first_name'] = 'SysAdmin'
    st.session_state['id'] = '100'
    st.switch_page('pages/40_Admin_Home.py')

if st.button('Sign up for an account', 
            type = 'primary', 
            use_container_width=True):
    st.session_state['authenticated'] = True
    st.session_state['first_name'] = 'Guest'
    st.session_state['id'] = '0'
    st.session_state['role'] = 'guest'
    st.switch_page('pages/Sign_Up.py')

