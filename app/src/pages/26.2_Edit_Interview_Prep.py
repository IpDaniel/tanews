import logging
logger = logging.getLogger(__name__)
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

SideBarLinks()

userID = st.session_state.get('id')

st.write("# Update a PeerStory")

peerstory_id = st.text_input("Enter the PeerStory ID you want to update:")

if peerstory_id:
    get_url = f"http://api:4000/p/peerstories/{peerstory_id}"
    response = requests.get(get_url)
    
    if response.status_code == 200:
        peerstory_data = response.json()
        
        existing_review = peerstory_data.get('review', '')
        existing_userID = peerstory_data.get('userID', '')
        existing_companyID = peerstory_data.get('companyID', '')
        
        with st.form("Update PeerStory Form"):
            new_review = st.text_area("Review:", value=existing_review)
            new_userID = st.number_input("User ID:", min_value=1, value=int(existing_userID))
            new_companyID = st.number_input("Company ID:", min_value=1, value=int(existing_companyID))
    
            submitted = st.form_submit_button("Update PeerStory")
    
            if submitted:
                update_data = {}
                if new_review != existing_review:
                    update_data["review"] = new_review
                if new_userID != existing_userID:
                    update_data["userID"] = new_userID
                if new_companyID != existing_companyID:
                    update_data["companyID"] = new_companyID
    
                if not update_data:
                    st.warning("No changes detected.")
                else:
                    put_url = f"http://api:4000/p/peerstories/{peerstory_id}"
                    put_response = requests.put(put_url, json=update_data)
    
                    if put_response.status_code == 200:
                        st.success("PeerStory updated successfully!")
                    else:
                        st.error(f"Failed to update PeerStory: {put_response.text}")
    else:
        st.error("PeerStory not found or unable to fetch PeerStory details.")
