# RTAPP
## An app to display real-time location of exposition owner in a Chilean Museum.


This project is a part of a museum exposition called [Hechizas](https://mac.uchile.cl/exposiciones/hechizas/) in Contemporany Art Museum. <br>
This is a cellphone mounted on a wall that shows real time location of the exposition owner with a small desviation. 
It has three componentes:
 - **Exposition owner mobile**: RTAPP access to real time coordinates location using [pyicloud](https://pypi.org/project/pyicloud/) through the server.
 - **Node.JS server on GCP**: A background process in Python access to pyicloud API and store the current coordinates of exposition owner on a file. A Node.JS API expose an endpoint to consume an encrypted version of owner location. Both components are mounted on a GCP Engine Compute instance.
 - **Expoistion App**: A web app built in React and [Leaflet](https://leafletjs.com) display a map that shows the real time position of expoistion owner with a small desviation using noise for security reasons. It updates every 5 seconds calling previuos described API.
 
 Project goes as following:
 ![Alt text](relative/path/to/img.jpg?raw=true "Title")
