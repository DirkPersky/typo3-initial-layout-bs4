class StatemanagerClass {
    private callbacks:array = [];

    attach(id:string, callback: ()=>any ){
        // params exist
        if(!id || !callback) return;
        // is already in handler
        let found:boolean = false;
        this.callbacks.map((_obj:any) => {
            if(_obj.name == id) {
                found = true;
                // override Function
                _obj.fnc = callback;
            }
        });
        // if not add new callback
        if(!found) {
            this.callbacks.push({
                name: id,
                fnc: callback,
            });
        }
    }
    // run Statemanager Function
    call(){
        this.callbacks.map((callback:any, index:number)=>{
            callback.fnc();
        });
    }

}

(<any>window).Statemanager = new StatemanagerClass();
export default (<any>window).Statemanager;