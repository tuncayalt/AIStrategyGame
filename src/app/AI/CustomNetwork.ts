import {Layer, Network} from 'synaptic';

export class CustomNetwork{
    myNetwork: Network;
    trainCount = 0;

    constructor(inputCount, hiddenCount, outputCount){
        var inputLayer = new Layer(inputCount);
        var hiddenLayer = new Layer(hiddenCount);
        var outputLayer = new Layer(outputCount);

        inputLayer.project(hiddenLayer);
        hiddenLayer.project(outputLayer);

        this.myNetwork = new Network({
            input: inputLayer,
            hidden: [hiddenLayer],
            output: outputLayer
        });

        // train the network
        var learningRate = .3;

        /*
        for (var i = 0; i < 10000; i++)
        {
            //down
            this.myNetwork.activate([0,0,0,1]);
            this.myNetwork.propagate(learningRate, [0,0,1,0]);
            
            //right
            this.myNetwork.activate([0,0,1,0]);
            this.myNetwork.propagate(learningRate, [0,0,0,1]);

            //left
            this.myNetwork.activate([1,0,0,0]);
            this.myNetwork.propagate(learningRate, [0,1,0,0]);
            
            //up
            this.myNetwork.activate([0,1,0,0]);
            this.myNetwork.propagate(learningRate, [1,0,0,0]);

            //down right
            this.myNetwork.activate([0,0,1,1]);
            this.myNetwork.propagate(learningRate, [0,0,1,1]);

            //up left
            this.myNetwork.activate([1,1,0,0]);
            this.myNetwork.propagate(learningRate, [1,1,0,0]);

            //up right
            this.myNetwork.activate([0,1,1,0]);
            this.myNetwork.propagate(learningRate, [1,0,0,1]);

            //down left
            this.myNetwork.activate([1,0,0,1]);
            this.myNetwork.propagate(learningRate, [0,1,1,0]);
        }
        */
    }
    
}