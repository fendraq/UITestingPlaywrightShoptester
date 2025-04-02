using Microsoft.Playwright;
using System.Threading.Tasks;
using TechTalk.SpecFlow;
using FluentAssertions;

namespace UITests.StepDefinitions;

[Binding]
public class HeaderSteps
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

  [Given("the user opens the homepage")]
  public async Task GivenTheUserOpensTheHomepage()
  {
    await _page.GotoAsync("http://localhost:3000/");
  }
  
  [ThenAttribute(@"the header should be visable")]
  public async Task ThenTheHeaderShouldBeVisable()
  {
    var header = await _page.QuerySelectorAsync("header");
    header.Should().NotBeNull("the page should contain a <header> element");
  }
}