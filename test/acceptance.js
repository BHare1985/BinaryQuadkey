"use strict"

var should = require('should');
var path = require('path');
var BinaryQuadkey = require(path.join(__dirname, '..', 'index.js'));
var assert = require('assert');
var Long = require("long");

function isValid(quadkey) {
    should.exist(quadkey);
    quadkey.should.have.property('x');
    quadkey.should.have.property('y');
    quadkey.should.have.property('zoom');
    quadkey.should.have.property('UInt64Quadkey');

    quadkey.x.should.be.a.Number;
    quadkey.y.should.be.a.Number;
    quadkey.zoom.should.be.a.Number;
    quadkey.UInt64Quadkey.should.be.an.Object.and.an.instanceof(Long);
}


suite('Acceptance:', function() {
    test("Can be constructed from Constructor",  function(){
        var expected = {x: 35210, y: 21493, zoom: 16};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom); 
        isValid(quadkey);
        quadkey.x.should.equal(expected.x);
        quadkey.y.should.equal(expected.y);
        quadkey.zoom.should.equal(expected.zoom);
    });

    test("Can be constructed from empty Constructor",  function(){
        var expected = {x: 0, y: 0, zoom: 0};
        var quadkey = new BinaryQuadkey();     
        isValid(quadkey);
        quadkey.x.should.equal(expected.x);
        quadkey.y.should.equal(expected.y);
        quadkey.zoom.should.equal(expected.zoom);
    });
    
    test("XY => toQuadkey()",  function(){
        var expected = {x: 35210, y: 21493, zoom: 16};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom);
        quadkey.toQuadkey().should.equal("1202102332221212");
    });


    test("XY => toString(2)",  function(){
        var expected = {x: 29, y: 50, zoom: 7, binary: "10110101100100000000000000000000000000000000000000000000000111"};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom);
        isValid(quadkey);
        quadkey.x.should.equal(expected.x);
        quadkey.y.should.equal(expected.y);
        quadkey.zoom.should.equal(expected.zoom);
        quadkey.toString(2).should.equal(expected.binary);
    });
    
    test("XY => toString(10)",  function(){
        var expected = {x: 29, y: 50, zoom: 7, decimal: "3270739229377822727"};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom);
        quadkey.toString(10).should.equal(expected.decimal);
    }); 
    
    test("XY => toString(16)",  function(){
        var expected = {x: 29, y: 50, zoom: 7, hex: "2d64000000000007"};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom);
        quadkey.toString(16).should.equal(expected.hex);
    });
 
 
    test("Can be constructed from string",  function(){
        var expected = {quadkey: "0210320130212302", binary: "10010011100001110010011011001000000000000000000000000000010000"};
        var quadkey = new BinaryQuadkey.fromQuadkey(expected.quadkey);
        isValid(quadkey);
        quadkey.zoom.should.equal(expected.quadkey.length);
        quadkey.toString(2).should.equal(expected.binary);
        quadkey.toQuadkey().should.equal(expected.quadkey);
    });

    test("getZoom",  function(){
        var expected = {x: 35210, y: 21493, zoom: 16};
        var quadkey = new BinaryQuadkey(expected.x, expected.y, expected.zoom);     
        quadkey.getZoom().should.equal(expected.zoom);
    });
    
    test("parentOf",  function(){
        var quadkey = new BinaryQuadkey.fromQuadkey("02103201302");
        quadkey.isParentOf(new BinaryQuadkey.fromQuadkey("0210320130212302")).should.equal(true);
        quadkey.isParentOf(new BinaryQuadkey.fromQuadkey("021020130212302")).should.equal(false);
        quadkey.isParentOf(new BinaryQuadkey.fromQuadkey("02103201302")).should.equal(false);
    });

 
    test("equals",  function(){
        var quadkey = new BinaryQuadkey.fromQuadkey("02103201302");
        quadkey.equals(new BinaryQuadkey.fromQuadkey("02103201302")).should.equal(true);
        quadkey.equals(new BinaryQuadkey.fromQuadkey("0210320130")).should.equal(false);
    });


    test("fromBits",  function(){
        var quadkey = new BinaryQuadkey.fromBits(11, 618776576);
        quadkey.toQuadkey().should.equal("02103201302");
    });
    
    test("getHigh and getLow",  function(){
        var quadkey = new BinaryQuadkey.fromBits(11, 618776576);
        quadkey.getLowBits().should.equal(11);
        quadkey.getHighBits().should.equal(618776576);
    });
});