describe('Restful Booker API Tests', () => {
    let authToken: string;
    let bookingId: string;
  
    it('Request token', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/auth',
        body: {
          username: 'admin',
          password: 'password123',
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('token');
        authToken = response.body.token;
      });
    });
  
    it('Create booking', () => {
      cy.request({
        method: 'POST',
        url: 'https://restful-booker.herokuapp.com/booking',
        body: {
          firstname: 'Jim',
          lastname: 'Brown',
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01',
          },
          additionalneeds: 'Breakfast',
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('bookingid');
        bookingId = response.body.bookingid;
      });
    });
  
    it('Update Booking', () => {
      cy.request({
        method: 'PUT',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        body: {
          firstname: 'James',
          lastname: 'Brown',
          totalprice: 111,
          depositpaid: true,
          bookingdates: {
            checkin: '2018-01-01',
            checkout: '2019-01-01',
          },
          additionalneeds: 'Breakfast',
        },
        headers: {
          Cookie: `token=${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(200);
      });
    });
  
    it('Delete Booking', () => {
      cy.request({
        method: 'DELETE',
        url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        headers: {
          Cookie: `token=${authToken}`,
        },
      }).then((response) => {
        expect(response.status).to.equal(201);
      });
    });
  });