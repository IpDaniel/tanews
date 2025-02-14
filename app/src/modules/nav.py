# Idea borrowed from https://github.com/fsmosca/sample-streamlit-authenticator

# This file has function to add certain functionality to the left side bar of the app

import streamlit as st

#### ------------------------ General ------------------------
def HomeNav():
    st.sidebar.page_link("Home.py", label="Home", icon="🏠")

def EditProfileNav():
    st.sidebar.page_link("pages/Edit_Profile.py", label="Edit Profile", icon="✏️")


#### ------------------------ Role of student ------------------------
def StudentHomeNav():
    st.sidebar.page_link(
        "pages/00_Student_Home.py", label="Student Home", icon="👤"
    )

def StudentQuestionBank():
    st.sidebar.page_link(
        "pages/01_Question_Bank.py", label="Question Bank", icon="🏦"
    )

def StudentInterviewPrep():
    st.sidebar.page_link(
        "pages/02_Interview_Prep.py", label="Interview Prep", icon="🎤"
    )

def StudentPeerStories():
    st.sidebar.page_link(
        "pages/03_Peer_Stories.py", label="Peer Stories", icon="📖"
    )

def StudentCompanies():
    st.sidebar.page_link(
        "pages/04_Companies.py", label="Companies", icon="🏢"
    )

def StudentAnalytics():
    st.sidebar.page_link(
        "pages/05_Analytics.py", label="Analytics", icon="📈"
    )

#### ------------------------ Role of Alumni ------------------------
def AlumniHomeNav():
    st.sidebar.page_link(
        "pages/10_Alumni_Home.py", label="Alumni Home", icon="👤"
    )

def AlumniQuestionBankNav():
    st.sidebar.page_link(
        "pages/11_Question_Bank.py", label="Question Bank", icon="🏦"
    )

def AlumniPeerStoriesNav():
    st.sidebar.page_link(
        "pages/12_Peer_Stories.py", label="Peer Stories", icon="📖"
    )

def AlumniCompaniesNav():
    st.sidebar.page_link(
        "pages/13_Companies.py", label="Companies", icon="🏢"
    )

def AlumniAnalyticsNav():
    st.sidebar.page_link(
        "pages/14_Analytics.py", label="Analytics", icon="📈"
    )

#### ------------------------ Role of Advisor ------------------------
def AdvisorHomeNav():
    st.sidebar.page_link(
        "pages/20_Advisor_Home.py", label="Advisor Home", icon="👤"
    )

def AdvisorUserNav():
    st.sidebar.page_link(
        "pages/25_Users.py", label="Users", icon="🌺"
    )

def AdvisorQuestionBank():
    st.sidebar.page_link(
        "pages/21_Question_Bank.py", label="Question Bank", icon="🏦"
    )

def AdvisorInterviewPrep():
    st.sidebar.page_link(
        "pages/26_Interview_Prep.py", label="Interview Prep", icon="🎤"
    )

def AdvisorPeerStories():
    st.sidebar.page_link(
        "pages/22_Peer_Stories.py", label="Peer Stories", icon="📖"
    )

def AdvisorCompanies():
    st.sidebar.page_link(
        "pages/23_Companies.py", label="Companies", icon="🏢"
    )

def AdvisorAnalytics():
    st.sidebar.page_link(
        "pages/24_Analytics.py", label="Analytics", icon="📈"
    )

#### ------------------------ Role of Teaching Assistant ------------------------
def TAHomeNav():
    st.sidebar.page_link(
        "pages/30_Teaching_Assistant_Home.py", label="TA Home", icon="👤"
    )

def TAUserNav():
    st.sidebar.page_link(
        "pages/25_Users.py", label="Users", icon="🌺"
    )

def TAQuestionBank():
    st.sidebar.page_link(
        "pages/21_Question_Bank.py", label="Question Bank", icon="🏦"
    )

def TAInterviewPrep():
    st.sidebar.page_link(
        "pages/32_Interview_Prep.py", label="Interview Prep", icon="🎤"
    )

def TAPeerStories():
    st.sidebar.page_link(
        "pages/22_Peer_Stories.py", label="Peer Stories", icon="📖"
    )

def TACompanies():
    st.sidebar.page_link(
        "pages/04_Companies.py", label="Companies", icon="🏢"
    )

def TAAnalytics():
    st.sidebar.page_link(
        "pages/24_Analytics.py", label="Analytics", icon="📈"
    )

# #### ------------------------ System Admin Role ------------------------

def AdminNav():
    st.sidebar.page_link(
        "pages/40_Admin_Home.py", label="Admin Home", icon="👤"
    )

def AdminQuestionBankNav():
    st.sidebar.page_link(
        "pages/41_Question_Bank.py", label="Question Bank", icon="🏦"
    )

def AdminInterviewPrepNav():
    st.sidebar.page_link(
        "pages/42_Interview_Prep.py", label="Interview Prep", icon="🎤"
    )

def AdminPeerStoriesNav():
    st.sidebar.page_link(
        "pages/43_Peer_Stories.py", label="Peer Stories", icon="📖"
    )

def AdminCompaniesNav():
    st.sidebar.page_link(
        "pages/44_Companies.py", label="Companies", icon="🏢"
    )

def AdminUserNav():
    st.sidebar.page_link(
        "pages/45_User.py", label="Users", icon="🌺"
    )

# --------------------------------Links Function -----------------------------------------------
def SideBarLinks(show_home=False):
    """
    This function handles adding links to the sidebar of the app based upon the logged-in user's role, which was put in the streamlit session_state object when logging in.
    """

    # add a logo to the sidebar always
    st.sidebar.image("assets/logo.png", width=150)
    # If there is no logged in user, redirect to the Home (Landing) page
    if "authenticated" not in st.session_state:
        st.session_state.authenticated = False
        st.switch_page("Home.py")

    if show_home:
        # Show the Home page link (the landing page)
        HomeNav()

    # Show the other page navigators depending on the users' role.
    if st.session_state["authenticated"]:

        # If the user role is a student, redirect to the student home page
        if st.session_state["role"] == "Student":
            StudentHomeNav()
            StudentQuestionBank()
            StudentInterviewPrep()
            StudentPeerStories()
            StudentCompanies()
            StudentAnalytics()
            EditProfileNav()
      
        # If the user role is a alumni, redirect to the alumni home page
        if st.session_state["role"] == "Alumni":
            AlumniHomeNav()
            AlumniQuestionBankNav()
            AlumniPeerStoriesNav()
            AlumniCompaniesNav()
            AlumniAnalyticsNav()
            EditProfileNav()

        # If the user role is a advisor, redirect to the advisor home pag
        if st.session_state["role"] == "Advisor":
            AdvisorHomeNav()
            AdvisorUserNav()
            AdvisorQuestionBank()
            AdvisorInterviewPrep()
            AdvisorPeerStories()
            AdvisorCompanies()
            AdvisorAnalytics()
            EditProfileNav()

        # If the user role is TA, redirect to the TA home page
        if st.session_state["role"] == "TA":
            TAHomeNav()
            TAUserNav()
            TAQuestionBank()
            TAInterviewPrep()
            TAPeerStories()
            TACompanies()
            TAAnalytics()
            EditProfileNav()

        # If the user is an administrator, give them access to the administrator pages
        if st.session_state["role"] == "administrator":
            AdminNav()
            AdminUserNav()
            AdminQuestionBankNav()
            AdminInterviewPrepNav()
            AdminPeerStoriesNav()
            AdminCompaniesNav()

    # Always show the About page at the bottom of the list of links
    # AboutPageNav()

    if st.session_state["authenticated"]:
        # Always show a logout button if there is a logged in user
        if st.sidebar.button("Logout"):
            del st.session_state["role"]
            del st.session_state["id"]
            del st.session_state["first_name"]
            del st.session_state["authenticated"]
            st.switch_page("Home.py")
