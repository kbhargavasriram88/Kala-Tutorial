from flask import Flask, request, jsonify, send_from_directory
import requests
import os

app = Flask(__name__, static_folder='.', static_url_path='')

# ==========================================
# GOOGLE FORM CONFIGURATION
# Replace this with the URL of your Google Form's `formResponse` endpoint.
# Example: "https://docs.google.com/forms/d/e/1FAIpQLSc.../formResponse"
GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfSyyhgdwuERoaiG5SHA4HWQpssM2JSWLLZtJ-YmTpqu39vxA/formResponse"

# Map your form fields to Google Form entry IDs
# To find these, inspect the HTML of your live Google Form and look for `name="entry.XXXXXXX"`
FORM_FIELDS = {
    'name': 'entry.415357295',    # Change to the real entry ID for 'Your Name'
    'phone': 'entry.1743626122',   # Change for 'Phone / WhatsApp'
    'subject': 'entry.288400185', # Change for 'Subject'
    'message': 'entry.1286475304'  # Change for 'Message'
}
# ==========================================

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return app.send_static_file(path)
    return "File not found", 404

@app.route('/api/submit', methods=['POST'])
def submit():
    try:
        data = request.json
        if not data:
            return jsonify({'success': False, 'message': 'No data provided'}), 400
        
        # Prepare data for Google Form
        form_data = {
            FORM_FIELDS['name']: data.get('name', ''),
            FORM_FIELDS['phone']: data.get('phone', ''),
            FORM_FIELDS['subject']: data.get('subject', ''),
            FORM_FIELDS['message']: data.get('message', '')
        }
        
        # Submit to Google Form using requests
        # If GOOGLE_FORM_URL is not set up correctly, we'll try to catch typical errors.
        if GOOGLE_FORM_URL == "YOUR_GOOGLE_FORM_RESPONSE_URL_HERE":
            print("WARNING: Google Form URL is not configured.")
            # For demonstration without a real URL, simply pretend it succeeded.
            return jsonify({'success': True, 'message': 'Demo mode: Form configuration missing, but request processed.'})

        response = requests.post(GOOGLE_FORM_URL, data=form_data)
        
        # Google forms returns 200 OK on success
        if response.status_code == 200:
            return jsonify({'success': True, 'message': 'Message sent successfully!'})
        else:
            return jsonify({'success': False, 'message': 'Failed to submit form to Google.'}), 500
            
    except Exception as e:
        print(f"Error submitting to Google Forms: {e}")
        return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    # Running the app on port 5000
    app.run(debug=True, port=5000)
