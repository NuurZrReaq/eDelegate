window.$ = {}
window.$.version = '0.0.1'
window.$.versiondate = '2018-10-22'
window.$.token = ''
window.$.mode = 'guest'
window.$.name = ''
window.$.cat = ''
window.$.item = ''
window.$.items=[]
window.$.strings = {}
window.$.history = {}
window.$.printLogo = undefined
window.$.printPortal = undefined
window.$.printResizeRequests = []
window.$.requestResize = function (obj) {
    window.$.printResizeRequests.push(obj)
}
window.$.finishResize = function () {
    window.$.printResizeRequests.pop();
    if (window.$.printPortal) //should not be null, but just incase
        window.$.printPortal.printInternal()
}
window.$.getPrintLogo = function () {
    window.$.requestResize("logo");
    return window.$.printLogo;
}
