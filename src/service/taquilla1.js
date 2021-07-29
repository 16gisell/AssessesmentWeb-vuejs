class Taquilla1Service{
    constructor(){
        this.URI = "http://localhost:3000/api/taquilla1";
    }

    async getTaquilla1(){
        const respuesta= await fetch(this.URI);
        const taquilla =respuesta.json();
        return taquilla;
    }

    async postTaquilla(data){
        const res = await fetch(this.URI+'/ticke1', {
            method:'POST',
            body:data,
            headers:{
                'content-type': 'application/json'
            }
        });
        const taquilla = await res.json();
        return taquilla;
    }
    async deleteTaquilla(id){
        const dele = await fetch(`${this.URI}/${id}`,{
            headers:{
                'content-type': 'application/json'
            },
            method:'DELETE'
        })
        const data = await dele.json();
        return data;
    }

    async getTaquillaID(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const taquilla =respuesta.json();
        return taquilla;
    }
}

export default Taquilla1Service;