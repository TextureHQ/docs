---
---

# Leads

This page provides an overview of managing Leads in the Texture Platform. Use this area to explain how incoming leads are captured, tracked, and converted, and how they integrate with Customers.

A **Lead** represents partial or preliminary information about a person who might become a [Customer](./customers.md), but isn't one yet. The Leads feature in Texture is designed for managing prospects, gathering minimal contact details, and eventually converting them to fully onboarded Customers once enough data is provided.

---

## Why Leads?

- **Lightweight Entry**: Only an email is required; all other fields are optional.  
- **Prospecting & Qualification**: Keep track of potential new Customers without needing complete data.  
- **Future Conversion**: Once a Lead is qualified and you have all the necessary info (e.g., address), they can become a Customer on the Texture Platform.  
- **CRM Sync**: The concept aligns with typical "Leads" in Salesforce or HubSpot. Our upcoming CRM integrations will sync these leads automatically.

---

## Lead Data

A Lead in Texture can contain:
- **Basic Info**: first name, last name, email (only email is required)  
- **Location Data**: optional fields like city, state, postal code  
- **Metadata**: if you want to attach additional context (e.g., marketing campaign source)

Since Leads are partial by design, you can store as little or as much as you know at the time.

---

## Leads in the Dashboard

Leads appear in the **Leads** section of the Texture Dashboard as a simple table view:
- **Filter & Search**: find Leads by name, email, city, or state.  
- **No Detail Page**: Unlike Customers, Leads don't currently have a dedicated detail page currently. All relevant fields are shown in the table in the Dashboard.  
- **Conversion Process**: When you're ready to collect more info and fully onboard a lead, you can gather the rest of the data (first/last name, address, etc.) and create a [Customer](./customers.md) record.

---

## API Usage

You can list, create, and retrieve Leads via the Texture REST API. Key endpoints:

- **List Leads**  
  ```http
  GET /leads
  ```
  Returns a paginated list of leads. You can filter or sort by name, email, creation date, etc.

- **Create a Lead**  
  ```http
  POST /leads
  ```
  Provide at least an `email`, plus any optional fields like first name, last name, state, or additional metadata.

- **Future Conversion to Customer**  
  There is no direct "convert" endpoint yet, but you can copy over the lead's data to a new `POST /customers` call when ready (or do this automatically in your workflow).

For the full request/response body schema, refer to our [interactive REST API docs](/api).

---

## When to Use Leads

- **Marketing Funnel**: Store minimal prospect info (e.g., just an email) without needing a complete Customer record.  
- **Sales Pipeline**: Integrate your CRM so that when new leads come in (e.g., from a web form), they appear in Texture as well.  
- **Gradual Data Enrichment**: As you learn more about the Lead, you can update the record with additional fields.

---

## Best Practices

1. **Store Just Enough**  
   - Don't overcomplicate your lead records. An email plus optional fields is enough to keep track.  
2. **Regular Cleanup**  
   - Periodically review leads and delete or convert them if no longer relevant.  
3. **CRM Integration**  
   - If you manage leads in Salesforce, HubSpot, or similar, keep them in sync with Texture to unify data.  
4. **Security & Privacy**  
   - Leads may contain partial PII. Use role-based access and data retention policies to protect their info.

---

## Questions or Need Help?

If you have questions about managing leads or need assistance with CRM integrations, use the live chat feature in the Dashboard (look for the chat bubble in the lower right corner) to connect with our team.

---

## Next Steps

- **Experiment** with `POST /leads` to capture new prospects.  
- **Filter & Manage** your lead list in the Dashboard to see how they progress.  
- **Convert** a lead to a full [Customer](./customers.md) record when ready to onboard their Devices or gather full address details.