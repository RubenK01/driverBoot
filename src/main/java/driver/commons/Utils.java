package driver.commons;

import java.util.*;

public class Utils {
	public static <T> List<T> getList(String  url, Class<T> clazz) {

//	   HttpClient client = HttpClientBuilder.create().build();
//	   HttpGet getRequest = new HttpGet(url);
//	   getRequest.setHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON);
//
	   List<T> data = null;
//
//	   HttpResponse response;
//	   try {
//	      response = client.execute(getRequest);
//	      data = Constants.JSON_MAPPER.readValue(response.getEntity().getContent(),
//	             JSON_MAPPER.getTypeFactory().constructCollectionType(ArrayList.class, clazz));
//	   } catch (IOException ex) {
//	      logger.error("Error retrieving  " + clazz.getName() + " " + ex.toString());
//	   }
	   return data;
	}
}
