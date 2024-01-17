# South East SAs Hackathon Project

## Health Progress Monitor



__Demonstrate Atlas Vector Search and RAG using a doctor's notes from patient visits.__

__SA Maintainers__: [Ayaz Shah](mailto:ayaz.shah@mongodb.com), [Charlie Little](mailto:charlie.little@mongodb.com), [John Belz](mailto:john.belz@mongodb.com), [Rocha DaSilva](mailto:marcelo.rocha@mongodb.com), [Matt Davis](mailto:matt.davis@mongodb.com), [David Hiltenbrand](mailto:david.hiltenbrand@mongodb.com), [Sahil Kedar](mailto:sahil.kedar@mongodb.com) <br/>
__Time to setup__: 15 mins <br/>
__Time to execute__: 15 mins <br/>

---

## Description

The concept involves developing an application for insurance providers to monitor the progress of a patient's health based on their doctor's visits. The application will utilize data from the past six months, including doctor's notes and potentially voice recordings. This data will be converted into vectors, store in MongoDB and then analyzed using a Large Language Model (LLM) to assess whether the patient's health is improving. This approach leverages the LLM's ability to understand and interpret complex medical data.

Integration of predictive analytics. By incorporating machine learning algorithms, the application could not only assess current health status but also predict future health outcomes based on trends in the data. This predictive feature could provide insurance providers with valuable insights into the potential future health trajectory of patients, enabling more informed decision-making regarding coverage and support. Additionally, the application could include a feature for anomaly detection, alerting providers to any sudden or significant changes in a patient's health that may require immediate attention. This proactive approach could improve patient care and potentially reduce costs associated with unforeseen medical events.


---

## Setup

__1. Configure Laptop__
* Ensure MongoDB version 3.6+ is already installed your laptop, mainly to enable MongoDB command line tools to be used (no MongoDB databases will be run on the laptop for this proof)
* Ensure Node (version 6+) and NPM are installed your laptop
* Download and install the [mgeneratejs](https://www.npmjs.com/package/mgeneratejs) JSON generator tool on your laptop
  ```bash
  npm install -g mgeneratejs
  ```
* Ensure Python 3 is installed and install required Python libraries:
  ```bash
  pip3 install pymongo
  pip3 install dnspython
  ```

__2. Configure Atlas Environment__
* __Note__: If using the [Shared Demo Environment](https://docs.google.com/document/d/1cWyqMbJ_cQP3j7S4FJQhjRRiKq9WPfwPG6BmJL2bMvY/edit), please refer to the pre-existing collections for this PoV. (health_progress_monitor.patients_col and health_progress_monitor.checkups_col)
* Log in to your [Atlas account](http://cloud.mongodb.com) (using the MongoDB SA preallocated Atlas credits system) and navigate to your SA project
* In the project's Security tab, choose to add a new user, e.g. __main_user__, and for __User Privileges__ specify __Read and write to any database__ (make a note of the password you specify)
* In the Security tab, add a new __IP Whitelist__ for your laptop's current IP address
* Create an __M10__ based 3 node replica-set in a single cloud provider region of your choice with default settings

__3. Load Data Into A Collection In The Atlas Cluster__
* In a new terminal/shell from the base folder of this proof, run the following command to generate partly templated, partly randomly generated JSON documents representing patient visits and doctor's notes into the database collection _health_progress_monitor.patients_col_
  ```bash
  mgeneratejs healthmonitor_patients.json -n 100 | mongoimport --uri "mongodb+srv://main_user:MyPassword@testcluster-abcde.mongodb.net/health_progress_monitor" --collection patients_col
  ```
 &nbsp;&nbsp;&nbsp; __Note 1__: First replace the password and address with the values captured earlier

 &nbsp;&nbsp;&nbsp; __Note 2__: You can verify the data loaded by going to your Atlas cluster and view it in the data explorer (via the **Collections tab**)

__4. $Unwind visit notes to create health_progress_monitor.checkups_col__
* Create the collection _health_progress_monitor.checkups_col_ using the aggregation pipeline in [extract_checkups_and_add_patient_id.mongodb](data/extract_checkups_and_add_patient_id.mongodb).
  
__5. Add Atlas Vector Search Index__
* Create the Vector Search index using the definition in [vector_index.json](data/vector_index.json).

__6. Configure OpenAI API Key__
* Go to the [OpenAI](https://platform.openai.com/overview) webpage to create your OpenAI API Key.
* ![Click View API Keys.](img/openAI_home.png)
* ![Click Create new secret key.](img/openAI_create_secret.png)

---

## Execution

Now that the demo environments have been configured, we will launch the web UI, configure our Atlas triggers, and finally test the functionality through the UI.

__1. Step 1 goes here__

* Details go here

__2. Configure the Atlas Triggers__

* Details go here
---

## Measurement

* Measurement 1 Details.
* Measurement 2 Details.
* Measurement 3 Details.