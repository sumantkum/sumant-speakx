import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Resolve the path to the proto file
const PROTO_PATH = path.resolve('../proto/questions.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the package definition
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const questionsProto = protoDescriptor.Questions;

// Create gRPC server
function startGrpcServer(grpcMethods) {
  const server = new grpc.Server();
  server.addService(questionsProto.Questions.service, {
    ...grpcMethods,
  });

  const port = process.env.PORT || "50051";  // Use a default port if not set

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (error, boundPort) => {
      if (error) {
        console.error("Error binding gRPC server:", error);
        return;
      }
      console.log(`Server running at http://0.0.0.0:${boundPort}`);
    }
  );
}

export default startGrpcServer;
