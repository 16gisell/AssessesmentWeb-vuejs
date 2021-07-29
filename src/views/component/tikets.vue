<template>
    <main>
        <div class="container" style="margin-top: 8%;">
            <div class="row">
                <div class="col-sm-12">
                    <div class="card text-center">
                        <div class="card-body">
                            <div class="row">
                                <div class="col">
                                    <label for="id_user" class="form-label">ID</label>
                                    <input type="text" id="id_user" name="id_user" class="form-control" placeholder="Documento identidad" aria-label="id_user">
                                </div>
                                <div class="col">
                                    <label for="nameUser" class="form-label">Nombre</label>
                                    <input type="text" id="nameUser" class="form-control" placeholder="Nombre Completo" aria-label="nameUser">
                                </div>
                                <div class="col">
                                    <button class="btn btn-primary" @click="solicitudTicket()">Submit</button>
                                </div>
                            </div>   
                        </div>
                    </div>
                </div>
            </div>
        </div>  
        <div class="container" style="margin-top: 8%;">
            <div class="row">
                <div class="col-sm-6" style="background-color: #673ab78f; padding: 5px;">
                    <div class="card-header">
                        <h5 class="card-title text-center">Taquilla1</h5>
                        <p class="card-text"> Tiempo: 
                            <span id="minutos">{{contador_m}}</span>:<span id="segundos">{{contador_s}}</span>
                        </p>    
                    </div>
                    <div class="row" v-for="dat of dtat1" v-bind:key="dat._id">
                        <div class="col-sm-12">
                            <div class="card text-center">
                                <div class="card-body">
                                    <h5 class="card-title">{{dat.idUser}}</h5>
                                    <a href="#" class="btn btn-primary">Ticket</a>
                                </div>
                            </div>
                        </div>    
                    </div>                
                </div>
                <div class="col-sm-6" style="background-color: #3ab3b78f; padding: 5px;">
                    <div class="card-header">
                        <h5 class="card-title text-center">Taquilla2</h5>                        
                        <p class="card-text"> Tiempo: 
                            <span id="minutos2">{{contador_m2}}</span>:<span id="segundos2">{{contador_s2}}</span>
                        </p>         
                    </div>
                    <div class="row" v-for="dat2 of dtat2" v-bind:key="dat2._id">
                        <div class="col-sm-12">
                            <div class="card text-center">
                                <div class="card-body">
                                    <h5 class="card-title">{{dat2.idUser}}</h5>
                                    <a href="#" class="btn btn-primary">Ticket</a>
                                </div>
                            </div>
                        </div>   
                    </div>                
                </div>
            </div>
        </div>
    </main>
</template>
<script>
import ListarService from '../../service/listarService';
import Taquilla1Service from '../../service/taquilla1';
import Taquilla2Service from '../../service/taquilla2';

const taquilla1Service = new Taquilla1Service();
const taquilla2Service = new Taquilla2Service();
const listarServices = new ListarService();

    export default {
        data() {
            return {
                message:'',
                contador_s:0,
                contador_m:0,
                cronometro:null,
                s:null,
                m:null,
                datosTaquilla1:"",
                dtat1:[],
                iduserTaquilla:"",
                dataIdT1:"",

                contador_s2:0,
                contador_m2:0,
                cronometro2:null,
                s2:null,
                m2:null,
                datosTaquilla2:"",
                dtat2:[],
                iduserTaquilla2:"",
            }
        },
        created(){   
            this.GetTaquilla1();  
            this.GetTaquilla2();  
        },
        methods: {
            GetTaquilla1(){ 
                this.tiempoTaquilla1();
                const datTaquilla1= taquilla1Service.getTaquilla1();
                datTaquilla1.then(data=>{
                    this.dtat1=data
                    this.datosTaquilla1 = data[0]._id
                    console.log(this.datosTaquilla1, "DATAAAAAAAAAAAA")
                })
                .catch(err=>console.log(err));
            },
            GetTaquilla2(){ 
                this.tiempoTaquilla2();
                const datTaquilla2= taquilla2Service.getTaquilla2();
                datTaquilla2.then(data=>{
                    this.dtat2=data
                    this.datosTaquilla2 = data[0]._id
                    console.log(this.datosTaquilla2, "DATAAAAAAAAAAAA")
                })
                .catch(err=>console.log(err));
            },
            tiempoTaquilla1(){  
                           
                this.s = document.getElementById("segundos");
                this.m = document.getElementById("minutos");
                this.cronometro = setInterval(this.cuenta ,1000);
            },
            cuenta(){
                if(this.contador_s==60)
                {
                    this.contador_s=0
                    this.contador_m++;
                    this.m = this.contador_m;     
                    console.log(this.m)           
                }
                if(this.contador_m==2)
                {
                    clearInterval(this.cronometro);
                    this.updateUserT1();
                }
                this.s= this.contador_s;
                this.contador_s++;
            },
             tiempoTaquilla2(){  
                clearInterval(this.cronometro2);            
                this.s2 = document.getElementById("segundos2");
                this.m2 = document.getElementById("minutos2");
                this.cronometro2 = setInterval(this.cuenta2 ,1000);
            },
            cuenta2(){
                if(this.contador_s2==60)
                {
                    this.contador_s2=0
                    this.contador_m2++;
                    this.m2 = this.contador_m2;     
                    console.log(this.m2)           
                }
                if(this.contador_m2==3)
                {
                    clearInterval(this.cronometro2);
                    this.updateUserT2();
                }
                this.s2= this.contador_s2;
                this.contador_s2++;
            },
            //solicitud tikets
            solicitudTicket(){            
                let id_user = document.getElementById("id_user").value;
                let nameUser = document.getElementById("nameUser").value;
                let data=JSON.stringify({
                    id_user: id_user,
                    nameUser: nameUser,
                    action: 'espera'
                })
                const solicitud = listarServices.postUser(data);
                solicitud.then(res=>{
                    console.log(res)
                    this.users(id_user)
                })                
            },
            //filtramos los id para tener los datos del id que se acaba de crear
            users(id){    
                console.log(id)
                const users = listarServices.getUsers();
                users.then(data=>{
                    const datoo= data.filter(dato=>{
                        return dato.id_user == id
                    })
                    const datoo2 = datoo.map(item=>{
                        return item._id
                    })
                         console.log(datoo)
                    if(datoo){
                        this.SelectTaquilla(datoo2)
                    }
                })
                .catch(err=>console.log(err));
            },
            //agregamos a taquilla de forma random
            SelectTaquilla(datoo2){
                const dat = datoo2[0];                
                var x = Math.floor((Math.random() * 2) + 1);
                if(x==1){
                    this.taquilla1(dat)
                    console.log("t1")
                }
                else if(x==2){
                    this.taquilla2(dat);
                    console.log("t2")
                }
                else{
                    return false;
                }
            },
            //********************************** TAQUILLA1 ****************************************/
            taquilla1(dat){
                console.log(dat)
                const data1= JSON.stringify({
                    idUser: dat
                });
                const taquilla1= taquilla1Service.postTaquilla(data1);
                taquilla1.then(res=>console.log(res))
                taquilla1.then(data=>{
                    this.dataTaquilla1();
                })
                .catch(err=>console.log(err))
            },
            dataTaquilla1(){ 
                const datTaquilla1= taquilla1Service.getTaquilla1();
                datTaquilla1.then(data=>{
                    this.dtat1=data
                    this.datosTaquilla1 = data[0]._id
                    console.log(this.datosTaquilla1, "DATAAAAAAAAAAAA")
                })
                .catch(err=>console.log(err));
            },
            //actualizamos usuario antes de eliminar
            updateUserT1(){
                console.log(this.datosTaquilla1, "UPDATE")
                const dato = JSON.stringify({
                    action:'Atendido'
                })
                const update= listarServices.putUser(this.datosTaquilla1, dato);
                update.then(data=>{
                    console.log(this.datosTaquilla1, "put")
                    this.deliteElementTaquilla1(this.datosTaquilla1)
                })                 
            },
            deliteElementTaquilla1(dataIdT1){
                console.log(dataIdT1)
                const DTaquilla1 = taquilla1Service.deleteTaquilla(dataIdT1)
                .then(res=>{console.log(res)})
                .then(data=>{
                    this.dataTaquilla1();
                })
                .catch(err=>console.log(err));    
            },

            //*************************************     taquilla2     ************************************** */           
            taquilla2(dat2){
                console.log(dat2, "taquilla 2")
                const data2= JSON.stringify({
                    idUser: dat2
                });
                const taquilla2= taquilla2Service.postTaquilla2(data2);
                taquilla2.then(res=>console.log(res))
                taquilla2.then(data=>{
                    this.dataTaquilla2();
                })
                .catch(err=>console.log(err))
            },
            dataTaquilla2(){ 
                const datTaquilla2= taquilla2Service.getTaquilla2();
                datTaquilla2.then(data=>{
                    this.dtat2=data
                    this.datosTaquilla2 = data[0]._id
                    console.log(this.datosTaquilla2)
                })
                .catch(err=>console.log(err));
            },
           //actualizamos usuario antes de eliminar
            updateUserT2(){
                console.log(this.datosTaquilla2, "UPDATE")
                const dato2 = JSON.stringify({
                    action:'Atendido'
                })
                const update2= listarServices.putUser(this.datosTaquilla2, dato2);
                update2.then(data=>{
                    console.log(this.datosTaquilla2, "put")
                    this.deliteElementTaquilla2(this.datosTaquilla2)
                })                 
            },
            deliteElementTaquilla2(dataIdT2){
                console.log(dataIdT2)
                const DTaquilla2 = taquilla2Service.deleteTaquilla2(dataIdT2)
                .then(res=>{console.log(res)})
                .then(data=>{
                    this.dataTaquilla2();
                    location.reload()
                })
                .catch(err=>console.log(err));    
            },            
        }
    }
</script>