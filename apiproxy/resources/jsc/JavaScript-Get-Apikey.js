 try {
    var _apikey = context.getVariable('request.header.apikey') ||
       context.getVariable('request.queryparam.apikey');
    context.setVariable('_apikey', _apikey);
} catch(e) {
    context.setVariable('js_exception', e);
}