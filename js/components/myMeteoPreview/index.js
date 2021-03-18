class mySliderPreview extends HTMLElement {

	connectedCallback(){
		// this.$article = document.createElement("article");
		// this.$aside = document.createElement("aside");
     
        // this.$conteiner.appendChild(this.$article);
		// this.$conteiner.appendChild(this.$aside);
		//En-tete
		this.$conteiner = document.createElement("div");
		this.$table     = document.createElement('table');
		this.$thead     = document.createElement('thead');
		this.$trtete     = document.createElement('tr');
	
		this.$date    = document.createElement('th');
	   
		this.$trtete.appendChild(this.$date);
		for(let i = 1; i<6; i++){
			this.$th = document.createElement('th');
			this.$th.innerHTML = "Jour "+i;
			this.$trtete.appendChild(this.$th);
	   }


		this.$date.classList.add('date');
		this.$conteiner.classList.add('conteiner');
		this.$date.innerHTML = "Ajord'huit";

	    
		this.$thead.appendChild(this.$trtete);
		this.$table.appendChild(this.$thead);
		//Body
		this.$tbody = document.createElement('tbody');
		this.$trbody     = document.createElement('tr');
		this.$article = document.createElement('th');
		this.$ville    =   document.createElement('div');
		this.$temperature    =   document.createElement('div');
		this.$description    =   document.createElement('div');
		this.$info    =   document.createElement('div');
		this.$tmax    =   document.createElement('div');
		this.$tmin    =   document.createElement('span');

		this.$article.classList.add('article');
		this.$ville.classList.add('ville');
		this.$temperature.classList.add('temperature');
		this.$description.classList.add('description');
		this.$info.classList.add('info');
		this.$tmax.classList.add('tmax');
		this.$tmin.classList.add('tmin');

	 
		this.$description.innerHTML = "Aucune information";
	 


	
        this.$info.appendChild(this.$tmax);
		this.$info.appendChild(this.$tmin);
		this.$article.appendChild(this.$ville);
		this.$article.appendChild(this.$temperature);
		this.$article.appendChild(this.$description);
		this.$article.appendChild(this.$info);
		this.$trbody.appendChild(this.$article);
		for(let i = 1; i<6; i++){
			this.$td     = document.createElement('td');
			this.$trbody.appendChild(this.$td);
	   }
        this.$tbody.appendChild(this.$trbody);
		this.$table.appendChild(this.$tbody);
		this.$conteiner.appendChild(this.$table);
		this.appendChild(this.$conteiner);
	}

}

customElements.define('my-meteo-preview', mySliderPreview);