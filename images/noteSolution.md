1. Le CLI n’est pas installé

    Soit globalement (npm list -g @angular/cli ne montre rien)

    Soit localement (pas dans ton projet node_modules)

🔵 Solution :

    Pour avoir un ng global, tu peux refaire :

npm install -g @angular/cli


et verifier le package.json : "@angular/cli": "~15.2.4",

Cette ligne veut dire :

    "Quand je fais npm install dans ce projet, installe localement le @angular/cli version environ 15.2.4."
	
pour verifier que dans le projet: npm list @angular/cli


------------------------------------
npm uninstall -g @angular/cli

npm install -g @angular/cli
