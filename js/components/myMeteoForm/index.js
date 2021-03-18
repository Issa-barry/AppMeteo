class myMeteoForm extends HTMLElement {

	constructor(){
		super();
	}

	connectedCallback(){
		this.$formConteiner     = document.createElement('div');
		this.$form              = document.createElement('div');
		this.$input             = document.createElement("input");
		this.$input.type        = "text";
		this.$input.placeholder = "Exp: Paris";
		this.$btn               = document.createElement("input");
		this.$btn.type          = "button";
		this.$btn.value         = "Trouver";
		this.$error             = document.createElement("div");

		this.$form.classList.add("formConteiner");
		this.$form.classList.add("form");
		this.$input.classList.add("inputValue");
		this.$btn.classList.add('myBtn');
		this.$error.classList.add('error');

		this.$formConteiner.appendChild(this.$error);
		this.$form.appendChild(this.$input);
		this.$form.appendChild(this.$btn);
        this.$formConteiner.appendChild(this.$form);
		this.appendChild(this.$formConteiner);

       //Gestion d'événement
	   this.$btn.addEventListener("click",this.afficher.bind(this))
 

	   //Cycle
	   setTimeout(()=> {
		this.$ville       = this.parentNode.querySelector('my-meteo-preview .ville');
		this.$temperature = this.parentNode.querySelector('my-meteo-preview .temperature');
		this.$description = this.parentNode.querySelector('my-meteo-preview .description');
		this.$tmax        = this.parentNode.querySelector('my-meteo-preview .tmax');
		this.$tmin        = this.parentNode.querySelector('my-meteo-preview .tmin');

		//Recuperation des colonnes jours
		this.$col = this.parentNode.querySelectorAll('my-meteo-preview td');
	    },0)
    

	}

	 /**************************************************************
	  *                          METHODES
	  ***************************************************************/
	 afficher(){
		//Si l'input est vide || Ont affiche un message et ont met les bordures en rouge
		if(this.$input.value == ""){
		  this.$error.innerHTML    = "<p> Ce champs ne doit pas être vide </p>";
		  this.$input.style.border = " 1px solid red";
		}
		else{  
		   //Ont eléve le message d'erreur et le style de l'input
			this.$input.style.border = " none";
			this.$error.innerHTML    = "";
			//Ont récupére les données
			 fetch('http://api.openweathermap.org/data/2.5/weather?q='+this.$input.value+'&units=metric&appid=c454f68c85d57803b028ca7ab4346258&lang=fr')
			 .then(res => res.json())
			 .then(data => {
				//Ont traite les données
				if(data['cod'] === 200){
					console.log(data['weather'][0]['icon'])
					 this.$ville.innerHTML       = data['name'];
					 this.$temperature.innerHTML = data['main']['temp']+" °C ";
					 this.$description.innerHTML = "<p>"+ data['weather'][0]['description']+"</p>" +"<img src='http://openweathermap.org/img/wn/"+data['weather'][0]['icon']+"@2x.png' alt=''>";
					 this.$tmax.innerHTML        = "Max "+ data['main']['temp_max'] +" °C";
					 this.$tmin.innerHTML        = "Min "+ data['main']['temp_min']+ " °C";
					

                    this.prevision();
					this.$input.value = "";
				 
				}else{
				   this.$error.innerHTML    = "<p>"+data['message']+"</p>";
				   this.$input.style.border = " 1px solid red";
				}
			 })
			 .catch(erro=> console.log("Ville introuvable"))
		}
   
       }//#Afficher


	   prevision(){
					fetch('http://api.openweathermap.org/data/2.5/forecast?q='+this.$input.value+'&units=metric&appid=c454f68c85d57803b028ca7ab4346258&lang=fr')
					.then(res => res.json())
					.then(data => {
						console.log(data)
						this.$tempPrevi = data['list'][0]['main']['temp'];
						this.$descPrev  = data['list'][0]['weather'][0]['description'];
				
							for(let i = 0; i< 5; i++ ){
								this.$col[i].innerHTML  = "<p> "+data['list'][i+8]['main']['temp']+" °C </p>";
								this.$col[i].innerHTML += "<img src='http://openweathermap.org/img/wn/"+data['list'][0]['weather'][0]['icon']+"@2x.png' alt=''>"
								this.$col[i].innerHTML += "<p>  "+data['list'][i+8]['weather'][0]['description']+"</p>";
							}

					}).catch(e => console.log(e));
					
				}

}

customElements.define('my-meteo-form', myMeteoForm);