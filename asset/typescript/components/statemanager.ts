class StatemanagerClass {
    private callbacks:any;
    private status:boolean;

    constructor() {
        this.callbacks = [];
        this.status = false;
    }

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
        // run if not done yer
        if(this.status){
            this.run({
                name: id,
                fnc: callback,
            });
        }
    }
    // run Statemanager Function
    call(){
        this.callbacks.map((callback:any, index:number)=>{
            this.run(callback);
        });

        this.status = true;
    }
    // run line
    run(data:any){
        data.fnc();
        console.log(data.name);
    }
}

(<any>window).Statemanager = new StatemanagerClass();
export default (<any>window).Statemanager;
