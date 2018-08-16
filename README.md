# Actions on Google: Search of the GIFs using Dialogflow and Cloud Functions for Firebase (Node.js)

This is a simple Google Assistant app, built using Dialogflow and Cloud Functions for Firebase (Node.js), to find the best GIFs using GIPHY API. The default language of the Dialogflow agent is Russian.

*Read this in other languages: [Русский](README.ru.md).*

## Setup Instructions

### Steps
1. Go to the Dialogflow console and create a new agent or navigate to the existing one. 
2. Click on the gear icon, the Export and Import tab, and the RESTORE FROM ZIP button. Choose the ZIP file from the repository.
3. Select *Fulfillment* from the left navigation menu.
4. Enable *Inline Editor*.
5. Copy the source code from the <code>functions</code> directory to the corresponding tabs in *Fulfillment*.
6. Specify your own GIPHY API key in the <code>index.js</code> tab.
7. Go to the Firebase console and upgrade your pricing plan to Flame or Blaze. The external network is not accessible in free pricing plans.

## References and How to report bugs
* Actions on Google documentation: [https://developers.google.com/actions/](https://developers.google.com/actions/).
* Dialoglow documentation: [https://dialogflow.com/docs/](https://dialogflow.com/docs/). 
* Cloud Functions for Firebase documentation: [https://firebase.google.com/docs/functions/](https://firebase.google.com/docs/functions/). 
* If you find any issues, please open a bug here on GitHub.

## License
See [LICENSE](LICENSE).