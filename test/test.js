//const nock = require('nock');
const expect = require('chai').expect;
const request = require('supertest');

/*
var getUser = nock('127.0.0.1')
                .get('/users/1')
                .reply(200, 
                {
                  id: 1,
                  username: 'I_Am_Test',
                  wins: 13,
                  loses: 12,
                  damage: 124511,
                  healing: 134189
                });

var getStats = nock('127.0.0.1')
				.get('/users/character')
				.reply(200,
				{
					character: 6,
					wins: 11,
					loses: 5,
					damage: 8000,
					healing: 9001
				});
*/

describe('Routes', ()=>{

	beforeEach( ()=>
	{
		this.server = require('../src/server.js');
	})

	afterEach(()=>
	{
		this.server.close();
	})

	it('Testing characters route file',(done)=>
	{
		request(this.server)
		.get('/character/test')
		.set('Accept', 'application/json')
		.expect(200)
		.expect( (response)=>
		{
			expect(response.body.healthy).to.be.true;
		})
		.end(done);
	});


	it('Testing users route file',(done)=>
	{
		request(this.server)
		.get('/user/test')
		.set('Accept', 'application/json')
		.expect(200)
		.expect( (response)=>
		{
			expect(response.body.healthy).to.be.true;
		})
		.end(done);
	});
});
