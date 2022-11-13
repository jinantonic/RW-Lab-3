const observable = Rx.Observable.create( obverser => {
    observable.next('hello')
    observable.next('world')
})

observable.subscribe(val => print(val))