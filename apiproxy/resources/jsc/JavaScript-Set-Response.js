try {
    var payload = JSON.parse(context.getVariable('calloutResponse.content'));
    
    payload.entities.forEach(function(truck) {
       delete(truck.uuid); 
       delete(truck.created);
       delete(truck.modified);
       delete(truck.metadata);
       delete(truck.test);
    });
    
    var truck = payload.entities[0];
    
    var rating_response = httpClient.get("https://baas-ug000sr.apigee.net/apigee-training/sandbox/ratings?ql=" + "select * where truck_name='" +
        truck.name + "'");
    rating_response.waitForComplete();
    
    if (rating_response.isSuccess()) {
        var ratings = JSON.parse(rating_response.getResponse().content);
        
        context.setVariable('ratings_response', rating_response.getResponse().content);
        ratings.entities.forEach(function(rating) {
            delete(rating.uuid);
            delete(rating.created);
            delete(rating.modified);
            delete(rating.metadata);
        });
        truck.ratings = ratings.entities;
    } else {
        context.setVariable('js_error', 'error retrieving ratings.');
    }
    
    context.setVariable('response.content', JSON.stringify(truck));
    context.setVariable('response.header.Content-Type', 'application/json');
} catch(e) {
    context.setVariable('json_error', e);
}