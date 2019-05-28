import { RegisterPage } from './register/register.po';
import { browser } from 'protractor';
import { LoginPage } from './login/login.po';
import { ProfilePage } from './profile/profile.po';
import { HomePage } from './home/home.po';
import { ListTripsPage } from './list-trips/list-trips.po';
import { ApplicationPage } from './application/application.po';

describe('workspace-project App', () => {
  let register: RegisterPage;
  let login: LoginPage;
  let profile: ProfilePage;
  let home: HomePage;
  let listTrips: ListTripsPage;
  let application: ApplicationPage;

  beforeEach(() => {
    register = new RegisterPage();
    login = new LoginPage();
    profile = new ProfilePage();
    home = new HomePage();
    listTrips = new ListTripsPage();
    application = new ApplicationPage();
  });

  it('should register, login and enter in the profile with a new user (positive test)', () => {
    register.navigateTo();
    register.fillRegisterPositive(); // Rellenamos el registro con datos correctos (test positivo)
    browser.sleep(4000); // Hacemos una parada de 4 segundos
    login.navigateTo();
    login.fillCredentials(register.login); // Rellenamos las credenciales con los datos del usuario que acabamos de registrar
    browser.sleep(4000);
    profile.navigateTo();
    browser.sleep(4000);
    expect(profile.getTitleText()).toEqual('Editar Perfil' || 'Edit Profile');
    // Para finalizar comprobamos el título de /profile (si el test e2e ha llegado hasta ahí significa que todo fue bien)
  });

  it('try to register a new user with an invalid password of less than 6 characters (negative test)', () => {
    profile.logout(); // Para que este test funcione a continuación del anterior, es necesario hacer primero logout
    browser.sleep(4000); // Hacemos una parada de 4 segundos
    register.navigateTo();
    register.fillRegisterNegative(); // Rellenamos el registro una contraseña inválida de menos de 6 caracteres (test negativo)
    browser.sleep(4000);
    expect(profile.getErrorMessage()).toEqual('La contraseña debería tener al menos 6 caracteres.' || 'Password should be at least 6 characters long.') ;
  });

  it('should Apply for a trip that has been published and is not started or cancelled (positive test)', () => {
    home.navigateTo();
    browser.sleep(4000); // Hacemos una parada de 4 segundos
    login.navigateTo();
    login.fillCredentials(register.login); // Rellenamos las credenciales con los datos del usuario que acabamos de registrar
    browser.sleep(4000);
    listTrips.navigateTo();
    browser.sleep(4000);
    listTrips.clickTrip();
    browser.sleep(4000);
    application.requestTrip();
    browser.sleep(4000);
    expect(application.getTitleText()).toEqual('El destino que sueñas');
  });
});
