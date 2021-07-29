<template>
    <main>
        <div class="alert alert-success" role="alert" v-if="message">
            {{message}}
        </div>

        <table class="table table-info table-striped">
            <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">ID</th>
                  <th scope="col">Nombre</th>
                  <th scope="col">Action</th>
                  <th scope="col"> </th>
                </tr>
              </thead>
              <tbody id="listTabla">
                <tr v-for="item, index of pedidos" :key="index">
                  <th scope="row">{{index}}</th>
                  <td>{{item.id_user}}</td>
                  <td>{{item.nameUser}}</td>
                  <td>{{item.action}}</td>
                  <td><button type="button" class="btn btn-danger" @click="DeleteUser(item._id)" v-if="item.action == 'Atendido'">Eliminar</button></td>
                </tr>
              </tbody>
        </table>
    </main>
    
</template>
<script>
import ListarService from '../../service/listarService';
const listarServices = new ListarService();
    export default {
        data() {
            return {
                message:'',
                pedidos:[]
            }
        },
        created(){
            this.getUsuarios();      
        },
        methods: {
            getUsuarios(){
                const pedidos = listarServices.getUsers();
                pedidos.then(data => {
                    this.pedidos = data;   
                    console.log(data, "data")                 
                })                
            },
            DeleteUser(id){
                const deleteUser = listarServices.deliteUser(id);
                deleteUser.then(res=>{
                    if(res){
                        this.message = res.message;
                        this.getUsuarios();
                    }                    
                })
                deleteUser.catch(err=>{
                    console.log(error)
                })
            },
        }
    }
</script>