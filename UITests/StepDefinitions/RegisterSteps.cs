using Microsoft.Playwright;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using FluentAssertions;

namespace UITests.StepDefinitions;

[Binding]
public class RegisterSteps
{
  private IPage _page;
  private IBrowser _browser;
  private IBrowserContext _context;

  [BeforeScenario]
  public async Task Setup()
  {
    var playwright = await Playwright.CreateAsync();
    _browser = await playwright.Chromium.LaunchAsync(new BrowserTypeLaunchOptions { Headless = true });
    _context = await _browser.NewContextAsync();
    _page = await _context.NewPageAsync();
  }

  [AfterScenario]
  public async Task TearDown()
  {
    await _context.CloseAsync();
    await _browser.CloseAsync();
  }

  [GivenAttribute(@"I am on the Shoptester")]
  public async Task GivenIAmOnTheShoptester()
  {
    await _page.GotoAsync("http://localhost:3000/");
  }

  [GivenAttribute(@"I see the register button")]
  public async Task GivenISeeTheRegisterButton()
  {
    await _page.WaitForSelectorAsync("[id='register-button']");
    var el = await _page.QuerySelectorAsync("*:has-text('Register')");
    Assert.NotNull(el);
  }

  [GivenAttribute(@"I click on the register button")]
  public async Task GivenIClickOnTheRegisterButton()
  {
    await _page.ClickAsync("[id='register-button']");
  }

  [ThenAttribute(@"I should se the register form")]
  public async Task ThenIShouldSeTheRegisterForm()
  {
    await _page.WaitForSelectorAsync("[id='register-form']");
    var el = await _page.QuerySelectorAsync("[id='register-form']");
    Assert.NotNull(el);
  }
}