class myMeteo extends HTMLElement {

	connectedCallback(){
		this.$shadow = this.attachShadow({mode: 'open'})

		let $link      = document.createElement("link");
			$link.rel  = "stylesheet";
			$link.type = "text/css"
			$link.href = "css/style.css";

	    this.$shadow.appendChild($link);
		
		this.$shadow.appendChild(document.createElement('my-meteo-form'));
		this.$shadow.appendChild(document.createElement('my-meteo-preview'));
	}

}

customElements.define('my-meteo', myMeteo)