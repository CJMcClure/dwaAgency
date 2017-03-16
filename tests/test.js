const nock = require('nock');
const expect = require('chai').expect;
const request = require('supertest');


var getUser = nock('localhost')
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

var getStats = nock('localhost')
				.get('/users/character')
				.reply(200,
				{
					character: 6,
					wins: 11,
					loses: 5,
					damage: 8000,
					healing: 9001
				});


describe('Routes', ()=>{

	beforeEach( ()=>
	{
		this.server = require('../src/server.js');
	})

	afterEach(()=>
	{
		this.server.close();
	})

	it('Testing users route', (done)=>
	{
		// done <- Helps with ASYC problems
		request(this.server)
		.get('/users/1')
		.set('Accept', 'application/json')
		.expect(200)
		.end(done);
	});

	it('Testing characters route',(done)=>
	{
		request(this.server)
		.get('/character/')
		.set('Accept', 'application/json')
		.expect(200)
		.expect( (response)=>
		{
			expect(response.body.thanks).to.be.true;
		})
		.end(done);
	});
});