/* CSE 264 - Fall 2014
 * Homework #1 - Mini HTTP Server
 * Name: TJ O'Hearn TJO216
 * Date: Due 1/28/15
 */
package edu.lehigh.cse264;

import java.io.*;
import java.net.*;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Date;


public class Main {
    // The port can be any small integer that isn't being used by another program
    private static final int port = 8568; //8567
    //http://localhost:8568/mywebapp/index.html
    public static String IP; //sorry, this is sloppy
    
    public static void main(String[] args) {
        try {
            System.out.println("Mini HTTP Server Starting Up");
            // Listen on port for a new connection request
            ServerSocket s = new ServerSocket(port);
            for (;;) {
               
                // Wait for a new TCP connection to come in from a client and 
                // accept it when it does. Return a reference to the socket 
                // that will be used to communicate with the client.
                Socket newSocket = s.accept();
                //Grab this, for IP address
                IP = ((InetSocketAddress)newSocket.getRemoteSocketAddress()).getAddress().getHostAddress();
                System.out.println("New connection from: " + IP);
                // Create a new handler object to handle the requests of the 
                // client that just connected.
                ClientHandler handler = new ClientHandler(newSocket);
                
                // Give the handler its own thread to handle requests to that 
                // the server can handle multiple clients simultaneously.
                new Thread(handler).start();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

class ClientHandler implements Runnable {
    // Socket used to handle the client requests.
    private Socket socket;
    public int responseCode;
    
    public ClientHandler(Socket s) {
        this.socket = s;
    }

    @Override
    public void run() {
        
        try {
            BufferedReader request = new BufferedReader(new InputStreamReader(socket.getInputStream()));
            DataOutputStream response = new DataOutputStream(socket.getOutputStream());
            List<String> headers = new ArrayList<>();

            try {
                String firstLine = request.readLine();
                if (firstLine.length() > 0) {
                    // Read Headers, one per line of the request
                    String line;
                    while ((line = request.readLine()).length() > 0) {
                        headers.add(line);
                    }
                    // Break the request line up unto individual token
                    String[] tokens = firstLine.split(" ");
                    
                    // The first token is the method name (GET, POST, etc.)
                    String method = tokens[0];
                    
                    // The second token is the resource being requested (eg. /index.html)
                    String resource = tokens[1];
                    
                    // Dump the entire request to the console for debugging
                    dumpRequest(firstLine, headers);
                    
                    
                    // Process the request based on the method used (GET is the only
                    // one we're implementing for now
                    responseCode = 0;
                    switch (method) {
                        case "GET":
                            responseCode = processGET(resource, headers, response);
                            break;
                        case "POST":
                            System.err.println(method + " method not implemented.");
                            break;
                        case "HEAD":
                            System.err.println(method + " method not implemented.");
                            break;
                        case "PUT":
                            System.err.println(method + " method not implemented.");
                            break;
                        case "DELETE":
                            System.err.println(method + " method not implemented.");
                            break;
                        case "TRACE":
                            System.err.println(method + " method not implemented.");
                            break;
                        case "OPTIONS":
                            System.err.println(method + " method not implemented.");
                            break;
                        default:
                            System.err.println("Unknown method: " + method);
                            break;
                    }
                    logRequest(Main.IP, firstLine);
                }
            } catch (Exception e) {
               // If we get an i/o error, tell the user that the resource is unavailable
               response.writeBytes("HTTP/1.1 404 ERROR\n\n");
            }
            // Clean up once the request has been processed
            request.close();
            response.close();
        } catch (Exception ex1) {
            System.out.println("Internal error: " + ex1.getMessage());
        }
    }

    // Write out the request header lines to the console
    private void dumpRequest(String firstLine, List<String> headers) {
        //grab this
        System.out.println(firstLine);
        for (String headerLine : headers) {
            System.out.println(headerLine);
        }
        System.out.println();
    }
    
    //logs request to access.log
    private void logRequest(String IP, String header){
        try{
            String requestedFileName = header.split(" ")[1];
            //System.out.println(requestedFileName);
            String fileExtension = requestedFileName.substring(requestedFileName.lastIndexOf(".") + 1);
            String contentType = getContentType(fileExtension);
            
            //File requestedFile = new File(requestedFileName.substring(1));
            String lastModified = getFileLastModified(requestedFileName);
            //System.out.println(lastModified);
            File file = new File("access.log");
            FileWriter fw = new FileWriter(file,true); //appends   
            BufferedWriter bw = new BufferedWriter(fw);
            bw.write(IP + " " + header + " " + responseCode + "\n\t" +
                    contentType + "\n\t" + lastModified + "\n");
            bw.close();
        }
        catch(IOException e){
            System.out.println("Error with File I/O");
            e.printStackTrace();
        }
    }
    
    private String getFileLastModified(String fileName){
        File requestedFile = new File(fileName.substring(1)); //assumes starting slash
        long lastModified = requestedFile.lastModified();
        
        Date date = new Date(lastModified);
        SimpleDateFormat dateFormat = new SimpleDateFormat("E, dd MMM yyyy hh:mm:ss z");
        String dateText = dateFormat.format(date);
        
        return "Last Modified: " + dateText;
    }
    
    private String getContentType(String fileExtension){
        String contentType = "Content-Type: ";
        switch (fileExtension){
            case ("gif"):
                contentType += "image/gif";
                break;
            case ("jpeg"):
                contentType += "image/jpeg";
                break;
            case ("png"):
                contentType += "image/png";
                break;
            case ("pdf"):
                contentType += "application/pdf";
                break;
            case ("xls"):
            case ("xlsx"):
                contentType += "application/vnd.ms-excel";
                break;
            case ("htm"):
            case ("html"):
                contentType += "text/html";
                break;
            default:
                contentType += "Not Recognized";
        }
        return contentType;
    }

    private int processGET(String resource, List<String> headers, DataOutputStream out) {
        try {

            // Default to index.html
            if (resource.endsWith("/")) {
                resource += "index.html";
            }

            // Create file path from requested resource compatable with the host OS
            String path = ("." + resource).replace('/', File.separatorChar);
            int length = (int) new File(path).length();
            byte[] b = new byte[length];

            // Read the requested resource into an array of bytes
            FileInputStream resourceStream;
            try {
                resourceStream = new FileInputStream(path);
                resourceStream.read(b);
            } catch (IOException ex) {
                out.writeBytes("HTTP/1.1 404 ERROR\n\n");
                return 404;
            }

            // Write HTTP response line to client
            out.writeBytes("HTTP/1.1 200 OK\n");
            
            // Write out the headers
            out.writeBytes("Content-Length:" + length + "\n");
            out.writeBytes("Connection: close\n");
            
            // Blank line ends the header section
            out.writeBytes("\n"); 
            
            // Send the requested resource to the client
            out.write(b, 0, length);
            
            // Return code 200 means "Successful"
            return 200;
        } catch (IOException ex) {
            try {
                out.writeBytes("HTTP/1.1 500 ERROR\n\n");
                return 500;
            } catch (IOException ex1) {
                System.out.println("Internal error: " + ex1.getMessage());
                return 500;
            }
        }
    }
}