import { defineStore } from "pinia";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            user: null,
            errors:{},
        };
    },
    getters: {},
    actions: {
          /* get authenticated user */
        async getUser(){
            if(localStorage.getItem('token')){
                const res = await fetch('/api/user',{
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const data = await res.json();
                if(res.ok){
                    this.user = data;
                  
                } 
              
            }
        },
        /* login and register */
        async authenticate(apiRoute, formData) {
                    const res = await fetch(`/api/${apiRoute}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                // Check if the response is successful
          
                const data = await res.json();
                if (data.errors) {
                    this.errors = data.errors /* this will pass value in the state */
                } else {
                    this.errors= {}
                   localStorage.setItem('token', data.token);
                   this.user = data.user
                  this.router.push({name: 'home'});
                }
               
          },
          /******************* Logout user *******************/
    async logout() {
        const res = await fetch("/api/logout", {
          method: "post",
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const data = await res.json();
       
  
        if (res.ok) {
          this.user = null;
          this.errors = {};
          localStorage.removeItem("token");
          this.router.push({ name: "home" });
        }
      },
    },
  });