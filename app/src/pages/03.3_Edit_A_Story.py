import logging
import streamlit as st
import requests
from streamlit_extras.app_logo import add_logo
from modules.nav import SideBarLinks

logger = logging.getLogger(__name__)

SideBarLinks()

current_user_id = st.session_state['id']

st.write("# Update a PeerStory")

peer_story_id = st.text_input("Enter the PeerStory ID you want to update:")

if peer_story_id:
    try:
        peer_story_id_int = int(peer_story_id)
    except ValueError:
        st.error("PeerStory ID must be an integer.")
        st.stop()

    get_url = f"http://api:4000/p/peerstories/{peer_story_id_int}"
    try:
        response = requests.get(get_url)
    except requests.exceptions.RequestException as e:
        st.error(f"Failed to connect to the backend: {e}")
        st.stop()

    if response.status_code == 200:
        try:
            peer_story_data = response.json()
        except ValueError:
            st.error("Failed to parse the response from the backend.")
            st.stop()

        existing_review = peer_story_data.get('review', '')
        existing_userID = peer_story_data.get('userID', '')
        existing_companyID = peer_story_data.get('companyID', '')

        st.subheader("Edit the PeerStory Details")

        with st.form("Update PeerStory Form"):
            updated_review = st.text_area("Review:", value=existing_review)
            updated_userID = st.number_input("User ID:", value=existing_userID)
            updated_companyID = st.number_input("Company ID:", value=existing_companyID)

            submitted = st.form_submit_button("Update PeerStory")

            if submitted:
                update_data = {
                    "review": updated_review.strip(),
                    "userID": updated_userID,
                    "companyID": updated_companyID
                }

                if (updated_review == existing_review and
                    updated_userID == existing_userID and
                    updated_companyID == existing_companyID):
                    st.warning("No changes detected. Please modify at least one field before submitting.")
                else:
                    put_url = f"http://api:4000/p/peerstories/{peer_story_id_int}"
                    try:
                        put_response = requests.put(put_url, json=update_data)
                    except requests.exceptions.RequestException as e:
                        st.error(f"Failed to connect to the backend: {e}")
                        st.stop()

                    if put_response.status_code == 200:
                        st.success("PeerStory updated successfully!")
                    else:
                        try:
                            error_message = put_response.json().get('error', put_response.text)
                        except ValueError:
                            error_message = put_response.text or "Unknown error occurred."

                        st.error(f"Failed to update PeerStory: {error_message}")
    elif response.status_code == 404:
        st.error(f"PeerStory with ID {peer_story_id} not found.")
    else:
        try:
            error_message = response.json().get('error', response.text)
        except ValueError:
            error_message = response.text or "Unknown error occurred."

        st.error(f"Error fetching PeerStory: {error_message}")
