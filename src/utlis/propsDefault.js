
export class createProp {

    static createAll(type,defaultValue){
        return { type :type,default:defaultValue}
    }

    static createFunction(defaultValue = ()=>{}){
        return this.createAll(Function,defaultValue)
    }

    static createObject(defaultValue={}){
        return this.createAll(Object,()=>(defaultValue))
    }

    static createArray(defaultValue=[]){
        return  this.createAll(Array,()=>defaultValue)
    }

    static createString(defaultValue=''){
        return this.createAll(String,defaultValue)
    }

    static createBoolean(defaultValue=false){
        return this.createAll(Boolean,defaultValue)
    }

    static createNumber(defaultValue=0){
        return this.createAll(Number,defaultValue)
    }
}

