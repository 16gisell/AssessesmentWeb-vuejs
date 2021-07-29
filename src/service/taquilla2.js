class Taquilla2Service{
    constructor(){
        this.URI = "http://localhost:3000/api/taquilla2";
    }

    async getTaquilla2(){
        const respuesta= await fetch(this.URI);
        const taquilla =respuesta.json();
        return taquilla;
    }

    async postTaquilla2(data){
        const res = await fetch(this.URI+'/ticke2', {
            method:'POST',
            body:data,
            headers:{
                'content-type': 'application/json'
            }
        });
        const taquilla = await res.json();
        return taquilla;
    }
    async deleteTaquilla2(id){
        const dele = await fetch(this.URI+'/'+id,{
            headers:{
                'content-type': 'application/json'
            },
            method:'DELETE'
        })
        const data = await dele.json();
        return data;
    }

    async getTaquilla2ID(id){
        const respuesta= await fetch(`${this.URI}/${id}`);
        const taquilla =respuesta.json();
        return taquilla;
    }
}

export default Taquilla2Service;